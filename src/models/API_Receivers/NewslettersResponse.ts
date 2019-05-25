export interface NewslettersResponse extends ArrayBuffer
    {
        description: string,
        htmlCode: number,
        typeResponse: string,
        value: [
          {
            id_memo_type: number,
            memo_date: string,
            memo_description: string,
            memo_title: string,
            user_id: number
          }
        ]
      }

