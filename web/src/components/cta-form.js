import React from 'react'
import * as styles from './cta-form.module.css'
import { Link } from 'gatsby'
import { IoLocationSharp as LocationIcon } from 'react-icons/io5'
import { BsArrowRight as ArrowIcon } from 'react-icons/bs'
import CTALink from './CTALink'
import { InputField } from './form'


function CtaForm ({ title }) {
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>{title}</h2>

      <form className={styles.form}>

        <div className={styles.inputWrapper}>
          <label className={styles.label} for="select-class-type">
            Select class type:
          </label>
          <select className={styles.select} id="select-class-type">
            <option disabled hidden defaultValue>Select your level</option>
            <option value="1">Beginner</option>
            <option value="2">Pre-intermediate</option>
            <option value="3">Intermediate</option>
            <option value="4">Upper-intermediate</option>
            <option value="5">Advanced</option>
          </select>
        </div>

        <div className={styles.inputContainer}>
          <label className={styles.label} for="input-location">
              Where do you live?
          </label>
          <input
            className={styles.input}
            // ref={autoCompleteRef}
            // onChange={event => setQuery(event.target.value)}
            placeholder="Where are you located?"
            // value={query}
          />
          <LocationIcon className={styles.inputIcon} />
        </div>

        <CTALink kind="large button" title="Schedule demo" route="/demo" />

      </form>

      <p className={styles.altOption}>Not your first time? <Link to="/register">Book classes</Link></p>

    </div>
  )
}

export default CtaForm