import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpStatus } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn(),
  };

  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return success response when login is successful', async () => {
      const mockUserData = { id: 1, email: 'test@example.com', token: 'abcd1234' };
      const res = mockResponse();

      mockAuthService.login.mockResolvedValue(mockUserData);

      await authController.login({ email: 'test@example.com', password: '123456' }, res);

      expect(authService.login).toHaveBeenCalledWith('test@example.com', '123456');
      expect(res.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(res.json).toHaveBeenCalledWith({
        statusCode: HttpStatus.CREATED,
        message: 'User Login successfully',
        data: mockUserData,
      });
    });

    it('should return error response when login throws error', async () => {
      const res = mockResponse();
      const mockError = new Error('Invalid credentials');

      mockAuthService.login.mockRejectedValue(mockError);

      await authController.login({ email: 'wrong@example.com', password: 'badpass' }, res);

      expect(authService.login).toHaveBeenCalledWith('wrong@example.com', 'badpass');
      expect(res.status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(res.json).toHaveBeenCalledWith({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Failed to login user',
        error: 'Invalid credentials',
      });
    });
  });
});
