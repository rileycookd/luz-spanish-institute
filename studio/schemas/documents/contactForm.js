export default {
  name: "contactFormSubmission",
  title: "Contact form submissions",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'subject',
      title: 'Subject',
      type: 'string'
    },
    {
      name: "message",
      title: "Message",
      type: "text",
    },
  ],
}