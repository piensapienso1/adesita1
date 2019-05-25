export interface UserResponse extends ArrayBuffer {
  description: string;
  htmlCode: number;
  typeResponse: string;
  value: [
    {
      age: number;
      cell_phone: string;
      date: string;
      date_birth: string;
      document_id: string;
      email: string;
      first_name: string;
      gender: string;
      last_name: string;
      phone: string;
      public_id: string;
      status: string;
      type: string;
      name?: string;
      user_code: string;
      user_id: number;
    }
  ];
}
