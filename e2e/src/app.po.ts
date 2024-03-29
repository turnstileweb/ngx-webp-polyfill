import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<any> {
    return browser.get(browser.baseUrl);
  }

  async getTitleText(): Promise<string> {
    return element(by.css('tw-root .content span')).getText();
  }
}
