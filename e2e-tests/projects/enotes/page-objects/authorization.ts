import {Input} from "../../../locators/input";
import {Button} from "../../../locators/button";

class AuthorizationPage {
    get usernameField(): Input {
        return new Input($(`#loginform-username`), 'Username field');
    }

    get passwordField(): Input {
        return new Input($(`#loginform-password`), 'Password field');
    }

    get loginButton(): Button {
        return new Button($(`[name="login-button"]`), 'Login');
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameField.fill(username, false);
        await this.passwordField.fill(password, false);
        await this.loginButton.waitUntilElementIsVisible();
        await this.loginButton.click();
        await this.loginButton.waitUntilElementIsInVisible();
    }
}

export default new AuthorizationPage();
