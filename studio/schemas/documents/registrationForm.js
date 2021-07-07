import React from 'react'
import { HiMail, HiOutlineMailOpen } from 'react-icons/hi'
import { GiCheckMark } from 'react-icons/gi'
import ComputedField from 'sanity-plugin-computed-field'
import { FaChalkboardTeacher } from 'react-icons/fa'
import { parseISO, format } from 'date-fns'

const formatPrice = (price) => {
  return (Math.round((price + Number.EPSILON) * 100) / 100).toFixed(2)
}

const calculateSizeDiscount = (classSize, min, sizeDiscount, maxDiscount) => {
  let currentSizeDiscount = 0;
  if (sizeDiscount && classSize > min) {
    currentSizeDiscount = sizeDiscount * (classSize - min);
    if(currentSizeDiscount > maxDiscount) {
      currentSizeDiscount = maxDiscount / 100;
    } else {
      currentSizeDiscount = currentSizeDiscount / 100;
    }
  }
  return currentSizeDiscount
}

const calculateBasePrice = (basePrice, classSize, min, sizeDiscount, maxDiscount) => {
  let classPrice = basePrice * classSize;
  if(sizeDiscount && classSize > min) {
    let calculatedSizeDiscount = calculateSizeDiscount(classSize, min, sizeDiscount, maxDiscount)
    classPrice = classPrice - (classPrice * (calculatedSizeDiscount))
  }
  return classPrice;
}

const calculatePackagePrice = (basePrice, quantity, discount) => {
  let classPrice = basePrice * quantity;
  if(discount) {
    classPrice = classPrice - (classPrice * (discount / 100));
  }
  return classPrice
}



export default {
  name: "registrationForm",
  title: "Registrations",
  icon: FaChalkboardTeacher,
  type: "document",
  initialValue: () => ({
    submitDate: new Date().toISOString()
  }),
  fieldsets: [
    {name: 'admin', title: 'Admin'},
    {name: 'application', title: 'Application'}
  ],
  fields: [
    {
      title: 'Submitted date',
      name: 'submitDate',
      type: 'datetime',
      readOnly: true,
      options: {
        dateFormat: 'DD MMM YYYY',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Today'
      },
      fieldset: 'admin',
    },
    {
      name: 'opened',
      title: 'Mark as read?',
      type: 'boolean',
      fieldset: 'admin'
    },
    {
      name: "price", 
      title: 'Amount due',
      type: "string", //"number" or "text" or "string" or "boolean"
      inputComponent: ComputedField,
      options: {
        editable: true,
        buttonText: "Recalculate",
        documentQuerySelection: `
          _id,
          quantity,
          classSize,
          duration,
          "classType": *[_type == "classType" && title == ^.classType  && !(_id in path("drafts.**"))] {
            pricing,
            min,
            sizeDiscount,
            maxDiscount,
            packages
          }
        `,
        reduceQueryResult: (r) => {
          const { min, sizeDiscount, maxDiscount, pricing, packages } = r.classType[0]
          const quantity = Number(r.quantity.match(/\d+/)[0])
          const discount = packages.filter(p => p.quantity === quantity)[0].discount
          let basePrice = pricing.filter(p => p.duration === Number(r.duration))[0].price
          let calculatedBasePrice = calculateBasePrice(
            basePrice, 
            Number(r.classSize), 
            min, 
            sizeDiscount, 
            maxDiscount
          )
          if(quantity && quantity > 0) {
            return `$${formatPrice(calculatePackagePrice(calculatedBasePrice, quantity, discount))} USD`
          } else {
            return `$${formatPrice(calculatedBasePrice)} USD`
          }
        }
      },
      fieldset: 'admin'
    },
    {
      title: 'Payment recieved?',
      name: 'payment',
      type: 'boolean',
      fieldset: 'admin',
    },
    {
      title: 'Assigned teacher',
      name: 'teacher',
      type: 'reference',
      to: { type: 'teacher' },
      fieldset: 'admin',
      description: 'Only displaying teachers in applicant\'s target language',
      options: {
        filter: ({document}) => {
          // Always make sure to check for document properties
          // before attempting to use them
          if (!document.language) {
            return;

          }
          return {
            filter: '_type == "teacher" && $language in languages[].language->.title',
            params: {
              language: document.language
            }
          }
        }
      }
    },
    {
      title: 'Related students',
      description: 'Choose an existing student (create a new student first if needed)',
      name: 'students',
      type: 'array',
      of: [
        { 
          type: 'reference',
          to: { type: 'student' },},
      ],
      fieldset: 'admin',
    },
    {
      name: "name",
      title: "Full name",
      type: "string",
      fieldset: 'application',
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      fieldset: 'application',
    },
    {
      name: "location",
      title: "Location",
      type: "string",
      fieldset: 'application',
    },
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      fieldset: 'application'
    },
    {
      name: "classType",
      title: "Class type",
      type: "string",
      fieldset: 'application',
    },
    {
      name: "level",
      title: "Spanish level",
      type: "string",
      fieldset: 'application',
    },
    {
      name: "classSize",
      title: "Class Size",
      type: "string",
      fieldset: 'application',
    },
    {
      name: "duration",
      title: "Duration",
      type: "string",
      fieldset: 'application',
    },
    {
      name: "quantity",
      title: "Quantity",
      type: "string",
      fieldset: 'application',
    },
    {
      name: "frequency",
      title: "Frequency",
      type: "string",
      fieldset: 'application',
    },
    {
      name: "timezone",
      title: "Timezone",
      type: "string",
      fieldset: "application",
    },
    {
      name: "schedule",
      title: "Schedule",
      type: "array",
      of: [
        { type: 'string' }
      ],
      fieldset: "application",
    }
  ],
  preview: {
    select: {
      name: 'name',
      classType: 'classType',
      quantity: 'quantity',
      classSize: 'classSize',
      date: 'submitDate',
      opened: 'opened',
      payment: 'payment'
    },
    prepare ({ name, opened, date, classType, quantity, payment, classSize }) {
      let classSizeString = ''
      let parsedDate = parseISO(date)
      let formattedDate = format(parsedDate, "dd/MM/yy")
      if(classSize) {
        classSizeString = `${classSize} student${Number(classSize) > 1 ? 's' : ''}`
      }

      let media = <HiMail />
      if(payment) {
        media = <GiCheckMark />
      } else if(opened) {
        media = <HiOutlineMailOpen />
      }

      return {
        title: `${payment ? 'PAID:' : ''} ${name}`,
        subtitle: `${formattedDate}: ${classType}, ${quantity}${classSizeString ? `, ${classSizeString}` : ''}`,
        media
      }
    }
  }
}