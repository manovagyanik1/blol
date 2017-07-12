const webdriver = require('selenium-node-webdriver');

export default class FBUtils {
    public static getAccessToken(): Promise<string> {
        const url = 'https://developers.facebook.com/tools/explorer/145634995501895?method=GET&path=1515871602074952%2Ffeed&version=v2.9';
        return webdriver()
        .then(function (driver) {
            return driver.get(url)
                .then(function () {
                    return driver.executeScript(function () {
                        const loginQuery = 'a._srj';
                        const loginDOM = document.querySelector(loginQuery) as HTMLElement;
                        loginDOM.click();
                    });
                })
                .then(function () {
                    driver.wait(function () {
                        return driver.isElementPresent(driver.webdriver.By.css('div#email_container.clearfix input.inputtext'));
                    }, 10 * 1000);
                    return driver.
                    findElement(driver.webdriver.By.css('div#email_container.clearfix input.inputtext')).
                    sendKeys('lolmenowtest@gmail.com');
                })
                .then(function () {
                    return driver.
                    findElement(driver.webdriver.By.css('input#pass.inputtext')).
                    sendKeys('wehavetonailit');
                })
                .then(function () {
                    return driver.executeScript(function () {
                        const loginQuery = 'button._42ft';
                        const loginDOM = document.querySelector(loginQuery) as HTMLElement;
                        loginDOM.click();
                    });
                })
                .then(function () {
                    const accessTokenQuery = 'label._2toh input._58al';
                    driver.wait(function () {
                        return driver.isElementPresent(driver.webdriver.By.css(accessTokenQuery));
                    }, 10 * 1000);
                    return driver.executeScript(function () {
                        const refreshQuery = 'span div._ohf a';
                        const accessTokenQuery = 'label._2toh input._58al';
                        const refreshDOM = document.querySelector(refreshQuery) as HTMLElement;
                        if (refreshDOM !== null && refreshDOM !== undefined){
                            refreshDOM.click();
                            driver.wait(function() {
                                return !driver.isElementPresent(driver.webdriver.By.cssSelector(refreshQuery));
                            }, 20 * 1000);
                            const accessTokenDOM = document.querySelector(accessTokenQuery) as HTMLTextAreaElement;
                            return accessTokenDOM.value;
                        } else {
                            const accessTokenDOM = document.querySelector(accessTokenQuery) as HTMLTextAreaElement;
                            return accessTokenDOM.value;
                        }
                    });
                })
                .then(function (result) {
                    console.log(result);
                    driver.quit();
                    return result;
                });
        });
    }
}

