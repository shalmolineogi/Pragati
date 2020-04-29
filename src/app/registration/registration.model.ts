export interface Registration {
  _id: String;
  teamname: String;
  evename: String;
  eveId: String;
  participants: [
    {
      participantNo: Number;
      name: String;
      clgname: String;
      email: String;
      contact: String;
    }
  ];
  payAmt: Number;
  paymentStatus: Boolean;
  _v: any;
}
