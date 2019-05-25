export interface AssistanceResponse extends ArrayBuffer {
    description: string,
    htmlCode: number,
    typeResponse: string,
    value: [
      {
        grade_id: number,
        id_school: number,
        name: string,
        school_name: string
      }
    ]}