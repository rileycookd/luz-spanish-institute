import S from '@sanity/desk-tool/structure-builder'
import React, { Fragment } from 'react';
import QueryContainer from 'part:@sanity/base/query-container';
import Spinner from 'part:@sanity/components/loading/spinner';
import Preview from 'part:@sanity/base/preview';
import schema from 'part:@sanity/base/schema';
import { MdSettings } from 'react-icons/md'
import { FaHandHoldingUsd } from 'react-icons/fa'
import { CgBrowser } from 'react-icons/cg'
import { IoHome } from 'react-icons/io5'
import pageBuilder from './src/structure/page-builder'
import forms from './src/structure/forms'
import staff from './src/structure/staff'
import clients from './src/structure/clients'
import marketing from './src/structure/marketing';
import admin from './src/structure/admin'
import resources from './src/structure/resources'
import SocialPreview from 'part:social-preview/component'


const hiddenTypes = ['companyInfo', 'testimonial', 'classType', 'faq', 'navigationMenu', 'route', 'page', 'siteSettings', 'contactForm', 'media.tag', 'registrationForm', 'category', 'footer', 'language', 'level', 'teacher', 'company', 'student', 'resource', 'quiz']

// Add incoming references to all documents in Studio

const AllReferences = ({ document }) => (
  <QueryContainer
    query="*[references($id)]"
    params={{ id: document.displayed._id.replace('drafts.', '') }}
  >
    {({ result, loading }) =>
      loading ? (
        <Spinner center message="Loading items…" />
      ) : (
        result && (
          <div>
            {result.documents.map(document => (
              <Fragment key={document._id}>
                <Preview value={document} type={schema.get(document._type)} />
              </Fragment>
            ))}
          </div>
        )
      )
    }
  </QueryContainer>
);

const CurrentStudents = ({ document }) => (
  <QueryContainer
    query={`*[references($id) && _type == "student" && status == true]`}
    params={{ id: document.displayed._id.replace('drafts.', '') }}
  >
    {({ result, loading }) =>
      loading ? (
        <Spinner center message="Loading items…" />
      ) : (
        result && (
          <div>
            {result.documents.map(document => (
              <Fragment key={document._id}>
                <Preview value={document} type={schema.get(document._type)} />
                {document.schedule && document.schedule.length && document.schedule.map(s => (
                  <div key={s._key}>
                    <p>{s.day}: {s.time.start}-{s.time.end}</p>
                  </div>
                ))}
              </Fragment>
            ))}
          </div>
        )
      )
    }
  </QueryContainer>
);

const RelatedRegistrations = ({ document }) => (
  <QueryContainer
    query={`*[references($id) && _type == "registrationForm"]`} 
    params={{ id: document.displayed._id.replace('drafts.', '') }}
  >
    {({ result, loading }) =>
      loading ? (
        <Spinner center message="Loading items…" />
      ) : (
        result && (
          <div>
            {result.documents.map(document => (
              <Fragment key={document._id}>
                <Preview value={document} type={schema.get(document._type)} />
              </Fragment>
            ))}
          </div>
        )
      )
    }
  </QueryContainer>
);

export const getDefaultDocumentNode = ({documentId, schemaType}) => {

  if (schemaType === "teacher") {
    return S.document().views([
      S.view.form(),
      S.view.component(RelatedRegistrations).title('Registrations'),
      S.view.component(CurrentStudents).title('Current students'),
      S.view.component(AllReferences).title('All references'),
    ])
  }
  if (schemaType === "company") {
    return S.document().views([
      S.view.form(),
      S.view.component(CurrentStudents).title('Employees'),
      S.view.component(AllReferences).title('All references'),
    ])
  }
  if (schemaType === "student") {
    return S.document().views([
      S.view.form(),
      S.view.component(RelatedRegistrations).title('Registrations'),
      S.view.component(AllReferences).title('All references'),
    ])
  }
  if (['resource'].includes(schemaType)) {
    return S.document().views([
      S.view.form(),
      S.view.component(SocialPreview()).title('Social & SEO'),
    ])
  }
  return S.document().views([
    S.view.form(),
    S.view.component(AllReferences).title('All references'),
  ]);
}

// export default S.defaults();

export default () =>
  S.list()
    .title('Content')
    .items([
      forms,
      admin,  
      clients,
      staff,
      S.listItem()
          .title('Services')
          .icon(FaHandHoldingUsd)
          .child(
            S.list()
              .title('Service menu')
              .items([
                S.documentTypeListItem('classType')
                  .title('Classes'),  
              ])
            ),
      marketing,
      S.listItem()
        .title('Website')
        .icon(CgBrowser)
        .child(
          S.list()
            .title('Website panel')
            .items([
              S.listItem()
              .title('Site Settings')
              .child(
                S.editor()
                  .id('siteSettings')
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              )
              .icon(MdSettings),
              S.documentListItem()
                .title('Homepage')
                .schemaType('page')
                .icon(IoHome)
                .child(
                  S.document()
                    .schemaType('page')
                    .documentId('homepage')
                    // .views([S.view.form(), PreviewIFrame()])
              ),
              pageBuilder,
            ])
        ), 
      resources,

      ...S.documentTypeListItems().filter(listItem => !hiddenTypes.includes(listItem.getId())),
    ])
