import React from "react"
import { Link, navigate } from "gatsby"
import { cn } from '../lib/helpers'
import * as styles from './CTALink.module.css'

const doNavigate = target => {
  if (!target || !target.length) {
    return;
  }
  const internal = /^\/(?!\/)/.test(target);
  if (internal) {
    navigate(target);
  } else {
    window.location = target;
  }
};

const CTALink = props => {

  // Internal
  let link = props.route || props.link || "#";
  if (
    props.landingPageRoute &&
    props.landingPageRoute.slug &&
    props.landingPageRoute.slug.current
  ) {
    link = `/${props.landingPageRoute.slug.current}`;
  }

  if (props.kind === "small button") {
    return (
      <button
        id="navAction"
        onClick={props.onClick ? props.onClick : () => doNavigate(link)}
        className={props.buttonActionClass || cn(styles.button, styles.buttonSmall)}
      >
        {props.title}
      </button>
    );
  }

  if (props.kind === "large button") {
    return (
      <button
        id="navAction"
        onClick={props.onClick ? props.onClick : () => doNavigate(link)}
        className={props.buttonActionClass || cn(styles.button, styles.buttonLarge)}
      >
        {props.title}
      </button>
    );
  }

  // External
  if (props.link) {
    return (
      <a href={props.link} target="_blank" rel="noopener noreferrer">
        {props.title}
      </a>
    );
  }

  // Render
  const el = props.custom ? (
    <Link to={link}>
      {props.children}
    </Link>
  ) : (
    <Link className={styles.root} to={link}>
      {props.title}
    </Link>
  )

  return (
    <>{el}</>
  );
};

export default CTALink;