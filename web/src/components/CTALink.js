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

  if (
    props.innerPageRoute &&
    props.innerPageRoute.slug &&
    props.innerPageRoute.slug.current
  ) {
    link = props.innerPageRoute.pathPrefix
      ? `/${props.innerPageRoute.pathPrefix}/${props.innerPageRoute.slug.current}`
      : `/${props.innerPageRoute.slug.current}`
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
      <a className={cn(styles.root, styles.link)} href={props.link} target="_blank" rel="noopener noreferrer">
        {props.title}
      </a>
    );
  }

  if (props.kind === "inline") {
    return (
      <Link className={cn(styles.root, styles.inline, props.className)} style={props.style} to={link}>
        {props.title || props.children}
      </Link>
    )
  }

  // Render
  const el = props.children ? (
    <Link className={cn(styles.root, props.className)} style={props.style} to={link}>
      {props.children}
    </Link>
  ) : (
    <Link className={cn(styles.root, styles.link, props.className)} style={props.style} to={link}>
      {props.title}
    </Link>
  )

  return (
    <>{el}</>
  );
};

export default CTALink;