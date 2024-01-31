class Address  {
    addressline;
    city;
    state;
    pincode;
  
    constructor(addr) {
      this.addressline = addr.addressline;
      this.city = addr.city;
      this.state = addr.state;
      this.pincode = addr.pincode;
    }

}

export default Address;