import React, { useState } from 'react'
import * as styles from './cta-form.module.css'
import { Link } from 'gatsby'
import { IoLocationSharp as LocationIcon } from 'react-icons/io5'
import { BsArrowRight as ArrowIcon } from 'react-icons/bs'
import CTALink from './CTALink'
import { InputField, SelectField } from './forms/Form'
import DatePicker from "react-datepicker";
import { getTimeZones, rawTimeZones, timeZonesNames } from "@vvo/tzdb";
import Select from 'react-select'

import "react-datepicker/dist/react-datepicker.css";



function CtaForm ({ title }) {
  const [startDate, setStartDate] = useState(new Date());
  const rawTimeZones = getTimeZones();
  const timeZoneOptions = rawTimeZones.map(t => ({label: t.rawFormat, value: t.name}))

  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{title}</h2>

      <form className={styles.form}>

        <DatePicker selected={startDate} showTimeSelect onChange={date => setStartDate(date)} />

        <Select options={timeZoneOptions} />

        <CTALink kind="large button" title="Schedule demo" route="/demo" />

      </form>

      <p className={styles.altOption}>Not your first time? <Link to="/register">Book classes</Link></p>

    </div>
  )
}

export default CtaForm