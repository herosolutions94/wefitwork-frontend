import { getCookie } from "cookies-next";
import parse from "html-react-parser";
import FormData from "form-data";
import moment from "moment";
// import FormData from "form-data";
// import variables from "styles/globals.module.scss";

export function doObjToFormData(obj) {
  let formData = new FormData();
  for (var key in obj) {
    if (Array.isArray(obj[key])) {
      for (let [keyv, value] of Object.entries(obj[key])) {
        formData.append(key + "[]", JSON.stringify(value));
      }
    } else {
      if (typeof obj[key] == "object") {
        formData.append(key, JSON.stringify(obj[key]));
      } else {
        if(obj[key] !== null && obj[key] !== undefined){
          formData.append(key, obj[key]);

        }
      }
    }
  }
  return formData;
}

export function doObjToFormDataWithBlob(obj) {
  let formData = new FormData();
  for (var key in obj) {
    if (Array.isArray(obj[key])) {
      for (let [keyv, value] of Object.entries(obj[key])) {
        formData.append(key + "[]", JSON.stringify(value));
      }
    } else {
      if (typeof obj[key] == "object") {
        if (key === "video") {
          formData.append(key, obj[key], "Interview-Video.mp4");
        }else{
          formData.append(key, JSON.stringify(obj[key]));
        }


        
      } else {
        formData.append(key, obj[key]);
      }
    }
  }
  return formData;
}


export function doObjToFormDataWithoutString(obj) {
  var formData = new FormData();
  for (var key in obj) {
    if (Array.isArray(obj[key])) {
      for (let [keyv, value] of Object.entries(obj[key])) {
        formData.append(key + "[]", value);
      }
    } else {
      if (typeof obj[key] == "object") {
        formData.append(key, obj[key]);
      } else {
        formData.append(key, obj[key]);
      }
    }
  }
  return formData;
}

export function doFirstUpperRestLower(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

export function doParseHTML(string) {
  return parse(string);
}

export function eventDateFormat(date) {
  return moment(date).format("DD, MMMM YYYY");
}

export function eventTimeFormat(time) {
  return moment(time, "HHmm").format("hh:mm A");
}

export function eventTimeFormatNew(time) {
  return moment(time, "HHmm").format("hh A");
}

export function onlyDayThreeletters(date) {
  return moment(date).format("ddd");
}

export function onlyDateTwoletters(date) {
  return moment(date).format("DD");
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function nowPlus6Days() {
  let days = [];
  let daysRequired = 7;

  for (let i = 0; i <= daysRequired; i++) {
    days.push(moment().add(i, "days").format("YYYY-MM-DD"));
  }
  return days;
}


export function cmsFileUrl(src, folder = "images") {
  return `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}uploads/${folder}/${src}`;
}


export function timeAgo(date) {
  const momentDate = moment(date);
  const diff = moment().diff(momentDate);

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  if (diff < minute) {
    return "Just now";
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diff < month) {
    const days = Math.floor(diff / day);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (diff < year) {
    const months = Math.floor(diff / month);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.floor(diff / year);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
}

export function format_amount(amount = parseFloat(0.00)) {
  return "₦ " + amount
}

export function format_amount_comma(amount = parseFloat(0)) {
  // Check if amount is a valid number
  if (typeof amount !== 'number' || isNaN(amount)) {
    return "Invalid amount";
  }

  // Assuming you want to display two decimal places and add commas
  const formattedAmount = "₦ " + amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return formattedAmount;
}

export function generateRandomNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

export function replaceSpacesWithDashes(text) {
  // Use a regular expression to replace spaces with dashes
  return text.replace(/\s+/g, '-');
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0
}


export function formatNumber(num, size = 6) {
  return `L&P${num.toString().padStart(size, '0')}`;
}

export function formatDate(dateString) {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  

  return `${day} ${month} ${year}`;
}

export function checkForEmptyValues(data) {
  for (const key in data) {
    if (data[key] === null || data[key] === "") {
      return key; // Return the key with the empty/null value
    }
  }
  return false; // Return null if no empty/null values are found
}

export function isArrayEmpty(arr) {
  return arr.length === 0;
}

export function getArrayCount(arr) {
  return arr.length;
}

export function getObjKeyCount(obj){
  return Object.keys(obj).length;
};

export function capitalizeFirstLetter(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);

  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');

  return `${day} ${month} ${year} | ${formattedHours} : ${formattedMinutes}`;
}

export function subscriptionStatus(status) {
  // console.log(typeof(status));
  if(status == 'active'){
    return <span className="badge rounded-pill bg-success">Active</span>
  }else if(status == 'non-renewing'){
    return <span className="badge rounded-pill bg-warning">Non Renewing</span>

  }else{
    return <span className="badge rounded-pill bg-danger">Cancelled</span>
  }

}

export function bytesToMegaBytes(bytes) {
  return bytes / (1024 * 1024);
}

export async function FileUpload(event, type = 'attchments') {
  const fd = new FormData();
  fd.append("file", event);
  fd.append("type", type);
  return axios.post(project_ap_url + "api/" + 'upload-file', fd).then((res) => {
      return res.data;
  });
}
export async function uploadMultiFiles(event, type) {
  let newImages = [];
  let images_arr = event.target.files;
  for (let i = 0; i < images_arr.length; i++) {
      let fileSize = images_arr[i].size;
      let sizeMb = bytesToMegaBytes(fileSize);
      if (sizeMb < 40) {
          let image = await FileUpload(images_arr[i], type).then((data) => {
              // console.log(data)
              if (data.file_name != undefined && data?.status === 1) {
                  newImages.push({ file_name: data.file_name, image_name: data?.file_name_text });
              }
              else if (data?.status === 0) {
                  toast.error(data?.msg,
                      TOAST_SETTINGS
                  ); return;
              }
          });
      }
  }
  return newImages;


}