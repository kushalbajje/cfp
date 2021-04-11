export class GlobalConstants {
  //private hostURL = "http://192.168.1.228:3000/"
  public static panelapiURL = 'http://localhost:3000/user/login';
  public static tripListURL = 'http://localhost:3000/bookings/getRidesList';
  public static requestResetPasswordURL =
    'http://localhost:3000/user/forgotpassword';
  public static updateNewPasswordURL =
    'http://localhost:3000/user/resetpassword';
  public static getCompanyList =
    'http://192.168.1.16:3000/business/getbusinessvendorslist';
  public static addBooking = 
  'http://192.168.1.16:3000/bookings/addbooking'
  public static checkTripLocation = 
  'http://192.168.1.16:3000/bookings/checkairportlocation'
  public static bulkUploadBooking = 
  'http://192.168.1.16:3000/bookings/uploadbulkbookingdata'
  public static getRidesCount = 
  'http://192.168.1.16:3000/bookings/getridescount'
  
  // public static getAddress =
  //   'https://api.mapbox.com/geocoding/v5/mapbox.places/77.5239188374834,13.00493729069898.json?access_token=pk.eyJ1Ijoia3VzaGFsYmFqamUiLCJhIjoiY2tpbDVwdGpwMGdjbTM2bzhjZWsxaHRoeSJ9.hcfYHTTreNb0c8cJTzYXww';

}
