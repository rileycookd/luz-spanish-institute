import { format, isFuture } from "date-fns";

export function cn(...args) {
  return args.filter(Boolean).join(" ");
}

export function mapEdgesToNodes(data) {
  if (!data.edges) return [];
  return data.edges.map(edge => edge.node);
}

export function filterOutDocsWithoutSlugs({ slug }) {
  return (slug || {}).current;
}

export function filterOutDocsPublishedInTheFuture({ publishedAt }) {
  return !isFuture(publishedAt);
}

export function getBlogUrl(slug) {
  return `/blog/${slug.current || slug}/`;
}

export function buildImageObj(source = { asset: {} }) {
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id }
  };

  if (source.crop) imageObj.crop = source.crop;
  if (source.hotspot) imageObj.hotspot = source.hotspot;

  return imageObj;
}

export function toPlainText(blocks) {
  if (!blocks) {
    return "";
  }
  return blocks
    .map(block => {
      if (block._type !== "block" || !block.children) {
        return "";
      }
      return block.children.map(child => child.text).join("");
    })
    .join("\n\n");
}

export function arrayFindWithAttr(array, attr, value) {
  for(var i = 0; i < array.length; i += 1) {
      if(array[i][attr] === value) {
          return i;
      }
  }
  return -1;
}

export function getClassSizeString(min, max) {
  let minStudents = min ? min : '1'
  let maxStudents = max ? `-${max}` : '+'
  let classSize = `${minStudents}${max !== min ? maxStudents : ''} student${max > 1 ? 's' : ''}`
  if(!max && !min) {
    classSize = '1+ students'
  }
  return classSize
}

export function getClassStartingPrice(pricing) {
  return pricing.map(p => {
    return p.price
  }).sort((a, b) => {
    return a - b
  })[0]
}

export function capitalizeWords(str) {
  return  str.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
}