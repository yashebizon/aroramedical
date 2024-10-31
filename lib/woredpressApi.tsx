import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WordpressApi_url,
});

const apiV1 = axios.create({
  baseURL:
    process.env.Wordpress_URL || "https://aroramedical.ebizonstaging.com",
});

export const resetPassword = async (
  key: string,
  login: string,
  password: string
) => {
  try {
    const res = await apiV1.post("/wp-json/custom/v1/reset-password-form", {
      key,
      login,
      new_password: password,
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const forgotPass = async (email: string) => {
  try {
    const res = await apiV1.post("/wp-json/custom/v1/forgot-password", {
      email,
    });
    return res;
  } catch (error) {
    return null;
  }
};

export const getPosts = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    return null;
  }
};

export const getPostBySlug = async (slug: any) => {
  const response = await api.get(`/posts?slug=${slug}`);
  return response.data.length > 0 ? response.data[0] : null;
};

export const fetchMenus = async () => {
  try {
    const response = await api.get("/menus/main-menu");
    return response.data;
  } catch (error) {
    return null;
  }
};
// lib/wooCommerceApi.js

export async function getPages() {
  try {
    const response = await api.get(`/pages`);
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function coursePage() {
  try {
    const response = await api.get(`/pages/26843`);
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function getPageBySlug(slug: any) {
  try {
    const response = await api.get(`/pages?slug=${slug}`);
    return response.data[0]; // Assuming slugs are unique and returns a single page
  } catch (error) {
    return null;
  }
}

// lib/api.js
export async function getPrimaryMenu() {
  try {
    const response = await api.get("/menu/672");
    return response.data;
  } catch (error) {
    return [];
  }
}

// homebanner
export async function gethomeBanner() {
  try {
    const response = await api.get("/home_banner");
    return response.data;
  } catch (error) {
    return [];
  }
}
// courselist
export async function getcourselist() {
  try {
    const response = await api.get("/courseList");
    return response.data;
  } catch (error) {
    return [];
  }
}

//our partner
export async function getpartner() {
  try {
    const response = await api.get("/our_partner");
    return response.data;
  } catch (error) {
    return [];
  }
}

export const getMediaById = async (id: any) => {
  try {
    const response = await api.get(`/media/${id}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

//events
export async function getEvents() {
  try {
    const response = await api.get("/events");
    return response.data;
  } catch (error) {
    return [];
  }
}

// export async function getPrimaryMenu() {
//   try {
//     const url = 'https://aroramedical.ebizonstaging.com/wp-json/wp/v2/whitebar-data';
//   const response = await axios.get(url);
//   return response.data;
//   } catch (error) {
//    console.error('Error fetching footer:', error);
//    return[];
//    }
// }

export async function getHomePage() {
  try {
    const response = await api.get(`/pages/96030`);
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function getfooter() {
  try {
    const response = await api.get("/footer");
    return response.data;
  } catch (error) {
    return [];
  }
}

//site logo
export async function getSiteLogo() {
  try {
    const response = await api.get("/site-logo");
    return response.data;
  } catch (error) {
    return null;
  }
}

export async function getCourseMeta(slug: any) {
  try {
    const response = await api.get(`/course/${slug}`);
    return response.data;
  } catch (error) {
    return [];
  }
}

export async function getAllCourses() {
  try {
    const response = await api.get("/courses"); // Fetch all courses
    return response.data; // Array of course objects with ID, title, and slug
  } catch (error) {
    return [];
  }
}

export async function getBlogs(slug: any) {
  try {
    const response = await api.get(`/all-pages/${slug}`);
    return response.data;
  } catch (error) {
    return [];
  }
}

export const getBlogById = async (id: number) => {
  try {
    const res = await api.get(`/posts/${id}`);
    if (res.status == 200) {
      return res.data;
    }
  } catch (err) {
    return [];
  }
};

export const getAllCategories = async () => {
  try {
    const res = await apiV1.get(`/wp-json/wp/v2/categories`);
    if (res.status == 200) {
      return res.data;
    }
  } catch (err) {
    return [];
  }
};

export const getPostsById = async (id: number) => {
  try {
    const res = await apiV1.get(`/wp-json/wp/v2/posts?categories=${id}`);
    if (res.status == 200) {
      return res.data;
    }
  } catch (err) {
    return [];
  }
};

export const getCart = async () => {
  try {
    const userToken = localStorage.getItem("token");
    const res = await apiV1.get("/wp-json/cocart/v2/cart", {
      headers: { Authorization: "Bearer " + userToken },
      withCredentials: true,
    });
    if (res.status == 200) {
      return res.data;
    }
  } catch (err) {
    return [];
  }
};



export const addToCart = async (
  id: any,
  quantity: any,
  slug: string,
  crossSells: any,
  month?: string
) => {
  try {
    const userToken = localStorage.getItem("token");
    console.log("month", month);
    const res = await apiV1.post(
      "/wp-json/cocart/v2/cart/add-item",
      {
        id: id + "",
        quantity: quantity + "",
        variation: {
          attribute_pa_duration: month || "12-months",
        },
        item_data: {
          course_route: slug || "",
          cross_sells: crossSells,
          month: month || "6-months"
        },
      },
      {
        headers: { Authorization: "Bearer " + userToken },
        withCredentials: true,
      }
    );
    if (res.status == 201 || res.status == 200) {
      return res.data;
    }
  } catch (err) {
    return [];
  }
};
export const updateCart = async (item_key: string, quantity: string) => {
  try {
    const userToken = localStorage.getItem("token");
    const res = await apiV1.post(
      "/wp-json/cocart/v2/cart/item/" + item_key,
      { quantity: quantity?.toString(), return_cart: true },
      {
        headers: { Authorization: "Bearer " + userToken },
        withCredentials: true,
      }
    );
    if (res.status == 200) {
      return res.data;
    }
  } catch (err) {
    return [];
  }
};

export const deleteItem = async (item_key: string) => {
  try {
    const userToken = localStorage.getItem("token");
    const res = await apiV1.delete(
      "/wp-json/cocart/v2/cart/item/" + item_key + "?return_status=true",
      {
        headers: { Authorization: "Bearer " + userToken },
        withCredentials: true,
      }
    );
    if (res.status == 200) {
      return res.data;
    }
  } catch (err) {
    return [];
  }
};

// export const getProducts = async (productId: any) => {
//   try {
//     const res = await apiV1.get(
//       "/wp-json/wc/v3/products/" +
//         productId +
//         "?consumer_key=ck_7c75371f31b067ebde1007d76b562cdd9c2fc704&consumer_secret=cs_ffdab369bdbc3f4c09c4e001a166b03824b22507"
//     );
//     if (res.status == 200) {
//       return res.data;
//     }
//   } catch (err) {
//     console.log(err);
//     return [];
//   }
// };

export const getProducts = async (productId: any) => {
  try {
    // First API call to fetch product data
    const res = await apiV1.get(
      "/wp-json/wc/v3/products/" +
      productId +
      "?consumer_key=ck_7c75371f31b067ebde1007d76b562cdd9c2fc704&consumer_secret=cs_ffdab369bdbc3f4c09c4e001a166b03824b22507"
    );

    if (res.status !== 200) {
      return [];
    }

    let productData = res.data;
    let metaData = productData.meta_data || [];

    // Second API call to fetch additional course data
    const resCustom = await apiV1.get(
      `/wp-json/custom/v1/products/${productId}`
    );

    if (resCustom.status === 200) {
      const customData = resCustom.data.meta_data || [];
      // Extract "course_date" and "future_course_date" from the second API
      const courseDateMeta = customData.find(
        (meta: any) => meta.key === "course_date"
      );
      const futureCourseDateMeta = customData.find(
        (meta: any) => meta.key === "future_course_date"
      );

      // Always add or replace "course_date" in meta_data
      if (courseDateMeta) {
        metaData = metaData.filter((meta: any) => meta.key !== "course_date"); // Remove any existing course_date
        metaData.push({
          key: "course_date",
          value: courseDateMeta.value || "",
        });
      }

      // Always add or replace "future_course_date" in meta_data
      if (futureCourseDateMeta) {
        metaData = metaData.filter((meta: any) => meta.key !== "future_course_date"); // Remove any existing future_course_date
        metaData.push({
          key: "future_course_date",
          value: futureCourseDateMeta.value || "",
        });
      }
      productData.meta_data = metaData;
    }
    return productData;
  } catch (err) {
    return [];
  }
};

export const createOrderWC = async (data: any) => {
  try {
    const res = await apiV1.post(
      "/wp-json/wc/v3/orders?consumer_key=ck_7c75371f31b067ebde1007d76b562cdd9c2fc704&consumer_secret=cs_ffdab369bdbc3f4c09c4e001a166b03824b22507",
      data
    );
    if (res.status == 200 || res.status == 201) {
      return res.data;
    }
  } catch (err) {
    return [];
  }
};

export const clearCart = async () => {
  try {
    const userToken = localStorage.getItem("token");
    const res = await apiV1.post(
      "/wp-json/cocart/v2/cart/clear",
      {},
      {
        headers: { Authorization: "Bearer " + userToken },
        withCredentials: true,
      }
    );
    if (res.status === 200) {
      return res;
    }
  } catch (err) {
    return [];
  }
};

export const getCoupons = async (coupon:any) => {
  try {
    console.log(coupon,"coupon")
    const res = await apiV1.post(
      "/wp-json/wc/v3/apply-coupon",coupon
    );
    if (res.status == 200) {
      return res.data;
    }
  } catch (err) {
    return [];
  }
};

export const getEventsProducts = async () => {
  try {
    const response = await apiV1.get("/wp-json/wp/v2/products-with-ticket");
    return response.data;
  } catch (err) {
    throw err; // Rethrow the error to handle it where the function is called
  }
};

// export const sendResentLink = async (
//   recipient_name: string,
//   recipient_email: string,
//   message: string, 
// ) => {
//   try {
//     const response = await apiV1.post(
//       `/wp-json/custom/v1/send-reset-link/?recipient_name=${recipient_name}&recipient_email=${recipient_email}&message=${message}`
//     );
//     return response.data;
//   } catch (err) {
//     throw err;
//   }
// };

export const sendResentLink = async (
  recipient_name: string,
  recipient_email: string,
  message: string,
  buyer: any
) => {
  try {
    const response = await apiV1.post(
      `/wp-json/custom/v1/send-reset-link/`,
      {
        recipient_name: recipient_name,
        recipient_email: recipient_email,
        message: message,
        buyer: buyer
      }
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const fetchCrossSells = async (id: string) => {
  try {
    const response = await apiV1.post(
      "/wp-json/custom/v1/product-cross-sells",
      { id: id }
    );
    if (response.status == 200) {
      return response.data;
    }
  } catch (err) {
    throw err;
  }
};

export const getCourseProductDetails = async (productId: any) => {
  try {
    const res = await apiV1.get("/wp-json/custom/v1/products/attributes");

    if (res.status == 200) {
      return res.data;
    }
  } catch (err) {
    return [];
  }
};


export const SubmitContactInfo = async (
  name: any,
  phonenum: any,
  email: string,
  message: any,
) => {
  try {
    const res = await apiV1.post(
      "/wp-json/contact-form/v1/submit",
      {
        name: name + "",
        phonenum: phonenum + "",
        email: email + "",
        message: message + ""
      },
    );
    if (res.status == 201 || res.status == 200) {
      return res.data;
    }
  } catch (err) {
    return [];
  }
};

// export const RegisterEmail = async (
//   email: string,
// ) => {
//   try {
//     const res = await apiV1.post(
//       "/wp-json/custom-api/v1/register-email/",
//       {
//         email: email + "",
//       },
//     );
//     if (res.status == 201 || res.status == 200) {
//       return res.data;
//     }
//   } catch (err) {
//     return err;
//   }
// };

export const RegisterEmail = async (email: string) => {
  try {
    const res = await apiV1.post("/wp-json/custom-api/v1/register-email/", {
      email: email + "",
    });

    if (res.status === 201 || res.status === 200) {
      return res.data;
    } else {
      // If API responds with an unexpected status, throw an error to be caught
      throw new Error(`Unexpected response status: ${res.status}`);
    }
  } catch (err: any) {
    if (err.response) {
      return {
        status: err.response.status,
        message: err.response.data?.message || "Server responded with an error.",
      };
    } else if (err.message) {
      return {
        status: 500,
        message: err.message,
      };
    } else {
      return {
        status: 500,
        message: "An unknown error occurred.",
      };
    }
  }
};


export const VerifyOTP = async (
  email: string,
  otp: string
) => {
  try {
    const res = await apiV1.post(
      "wp-json/custom-api/v1/verify-otp/",
      {
        email: email + "",
        otp: otp + ""
      },
    );
    if (res.status == 201 || res.status == 200) {
      return res.data;
    }
  } catch (err) {
    return [];
  }
};


// export const getPostsBySearch = async (query: string) => {
//   try {
//     const res = await apiV1.get(`wp-json/custom-api/v1/search/?search_text=${query}`);
//     return res.data;  
//   } catch (err) {
//     console.error("Error fetching posts by search:", err);
//     return []; 
//   }
// };

export const getBlogBySearch = async (query: string) => {
  try {

    const res = await apiV1.get(`wp-json/custom-api/v1/search/?search_text=${encodeURIComponent(query)}`);

    // Check if the response has data
    if (res && res.data) {
      return res.data;  // Return the array of posts directly
    } else {
      console.warn("No data found for the query:", query);
      return []; // Return an empty array if no data found
    }
  } catch (err) {
    console.error("Error fetching posts by search:", err);
    return []; // Return an empty array in case of an error
  }
};

// Function to fetch the Privacy Policy from the API
export const getPrivacyPolicy = async () => {
  try {
    const res = await apiV1.get('https://aroramedical.ebizonstaging.com/wp-json/custom/v1/privacy-policy');
    if (res && res.data) {
      return res.data;
    }
  } catch (err) {
    console.error("Error fetching privacy policy:", err);
    return err;
  }
};

export const getContactPageinfo = async () => {
  try {
    const res = await apiV1.get('https://aroramedical.ebizonstaging.com/wp-json/custom/v1/contact-us');
    if (res && res.data) {
      return res.data;
    }
  } catch (err) {
    console.error("Error fetching privacy policy:", err);
    return err;
  }
};

export const getTermsandConditionPageinfo = async () => {
  try {
    const res = await apiV1.get('https://aroramedical.ebizonstaging.com/wp-json/custom/v1/terms-and-conditions');
    if (res && res.data) {
      return res.data;
    }
  } catch (err) {
    console.error("Error fetching terms and condition page:", err);
    return err;
  }
};

export const getNotFoundPageInfo = async () => {
  try {
    const res = await apiV1.get('https://aroramedical.ebizonstaging.com/wp-json/custom/v1/404');
    if (res && res.data) {
      return res.data;
    }
  } catch (err) {
    console.error("Error fetching 404 page:", err);
    return err;
  }
};


export const getAboutusPageInfo = async () => {
  try {
    const res = await apiV1.get('https://aroramedical.ebizonstaging.com/wp-json/custom-api/v1/about-us');
    if (res && res.data) {
      return res.data;
    }
  } catch (err) {
    console.error("Error fetching about us  page:", err);
    return err;
  }
};

export const getRefundPolicyPage = async () => {
  try {
    const res = await apiV1.get('https://aroramedical.ebizonstaging.com/wp-json/custom-api/v1/refund_returns');
    if (res && res.data) {
      return res.data;
    }
  } catch (err) {
    console.error("Error fetching refund policy  page:", err);
    return err;
  }
};


export const getFreeplannerPage = async () => {
  try {
    const res = await apiV1.get('https://aroramedical.ebizonstaging.com/wp-json/custom-api/v1/free-planners');
    if (res && res.data) {
      return res.data;
    }
  } catch (err) {
    console.error("Error fetching free planner  page:", err);
    return err;
  }
};


export const getAcceptableUsePolicy = async () => {
  try {
    const res = await apiV1.get('https://aroramedical.ebizonstaging.com/wp-json/custom/v1/acceptable-use-policy');
    if (res && res.data) {
      return res.data;
    }
  } catch (err) {
    console.error("Error fetching Acceptable use policy  page:", err);
    return err;
  }
};


export const getCookiePolicy = async () => {
  try {
    const response = await apiV1.get('https://aroramedical.ebizonstaging.com/wp-json/custom/v1/cookies-policy');
    return response.data;
  } catch (err: any) {
    // Handle cases where error.response might be undefined (e.g., network issues)
    const errorMessage = err.response?.data?.message || err.message || 'Could not retrieve cookie policy.';
    throw new Error(errorMessage);
  }
};

export const checkOrderStatus = async (id: any) => {
  try {
    console.log("ressss", id);
    const response = await apiV1.get(`https://aroramedical.ebizonstaging.com/wp-json/custom/v2/check-order-lookup/${id}`);
    return response.data;
  }
  catch (err: any) {
    const errorMessage = err.response?.data?.message || err.message || 'Could not retrieve cookie policy.';
    throw new Error(errorMessage);
  }
}

