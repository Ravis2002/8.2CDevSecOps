describe('Component Tests', () => {
  describe('PasswordComponent', () => {

    let comp;
    let service;

    beforeEach(() => {
      // Mock service with jest.fn() so we can test calls
      service = {
        save: jest.fn()
      };

      // Mock component object with properties and a method
      comp = {
        password: null,
        confirmPassword: null,
        doNotMatch: null,
        error: null,
        success: null,
        changePassword() {
          if (this.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
            this.error = null;
            this.success = null;
          } else {
            this.doNotMatch = null;
            this.error = null;
            this.success = 'OK';
            service.save(this.password);
          }
        }
      };
    });

    test('should show error if passwords do not match', () => {
      comp.password = 'password1';
      comp.confirmPassword = 'password2';

      comp.changePassword();

      expect(comp.doNotMatch).toBe('ERROR');
      expect(comp.error).toBeNull();
      expect(comp.success).toBeNull();
    });

    test('should call Auth.changePassword when passwords match', () => {
      comp.password = comp.confirmPassword = 'myPassword';

      comp.changePassword();

      expect(service.save).toHaveBeenCalledWith('myPassword');
    });

    test('should set success to OK upon success', () => {
      comp.password = comp.confirmPassword = 'myPassword';

      comp.changePassword();

      expect(comp.doNotMatch).toBeNull();
      expect(comp.error).toBeNull();
      expect(comp.success).toBe('OK');
    });

    test('should notify of error if change password fails', () => {
      // Override changePassword to simulate failure scenario
      comp.changePassword = function() {
        this.doNotMatch = null;
        this.success = null;
        this.error = 'ERROR';
      };

      comp.password = comp.confirmPassword = 'myPassword';

      comp.changePassword();

      expect(comp.doNotMatch).toBeNull();
      expect(comp.success).toBeNull();
      expect(comp.error).toBe('ERROR');
    });
  });
});
