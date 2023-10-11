import wd from 'wd';

const PORT = 4723;

const config = { 
    platformName: "Android",
    platformVersion: "13",
    deviceName: "Android Emulator",
    app: ".//android/app/build/outputs/apk/debug/app-debug.apk",
    automationName: "UiAutomator2"
};

const driver = wd.promiseChainRemote('localhost', PORT);

beforeAll(async () => {
    await driver.init(config);
})


test('Test Accessibilty Id', async () => {
    expect(await driver.hasElementByAccessibilityId('email')).toBe(true);
    expect(await driver.hasElementByAccessibilityId('password')).toBe(true);
});