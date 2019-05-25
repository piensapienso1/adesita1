export interface SchoolGetById extends ArrayBuffer {
    description: string,
    htmlCode: number,
    typeResponse: string,
    value: [
      {
        apartment: number,
        block: string,
        document_id: string,
        name: string,
        school_code: string,
        school_id: number,
        street: string
      }
    ]}