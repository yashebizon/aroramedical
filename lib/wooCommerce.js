import axios from "axios";

const url = "https://aroramedical.ebizonstaging.com/wp-json/wc/v3";
const consumerKey = "ck_7c75371f31b067ebde1007d76b562cdd9c2fc704";
const consumerSecret = "cs_ffdab369bdbc3f4c09c4e001a166b03824b22507";

export const postCustomer = async (data) => {
  try {
    const res = await axios.post(url + "/customers", data, {
      headers: { "Content-Type": "multipart/form-data" },
      auth: {
        username: consumerKey,
        password: consumerSecret,
      },
    });
    if (res) {
      return res;
    }
  } catch (err) {
    return err?.response?.data?.code;
  }
};
