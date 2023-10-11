describe("Request Test", () => {
    beforeEach(async () => {
      await $("~Email input").setValue("geekdeer@gmail.com");
      await $("~Password input").setValue("Patata123");
      await $("~Login Button").click();
      // await driver.pause(3000)
    });
  
    it("Logged in", async () => {
      await driver.pause(5000);
  
      await expect(
        $(
          '//android.widget.TextView[@content-desc="Log Out Button"]'
        )
      ).toHaveText("LogOut");

      await $(
        '//android.widget.TextView[@content-desc="Log Out Button"]'
      ).click();
    });

    it("Create Request", async () => {
      await $("~Add Button").click();
      await driver.pause(4000);
      await $('//android.view.ViewGroup[@content-desc="Escoge el tipo de producto"]/android.widget.TextView').click();
      await driver.pause(1000);
      await $('//android.view.ViewGroup[@content-desc="Frutas"]/android.widget.TextView').click();
      await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.EditText[1]').
      setValue("Manzana");
      await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.widget.EditText[2]').
      setValue("1");
      await $('//android.view.ViewGroup[@content-desc="Unidad"]/android.widget.TextView').click();
      await driver.pause(1000);
      await $("~Kilos").click()
      await $('/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[3]/android.widget.EditText').
      click();
      await driver.pause(1000);
      await $('//android.view.ViewGroup[@content-desc="31"]/android.widget.TextView').click();
      await $("~Guardar").click()
      await driver.pause(1000);
  
      await expect(
        $(
          '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.view.ViewGroup/android.widget.TextView[1]'
        )
      ).toHaveText("Solicitud creada");
    });
  
  });