import S from '@sanity/desk-tool/structure-builder'
import { GiHumanPyramid } from 'react-icons/gi'
import { IoIosPeople } from 'react-icons/io'
import { BsBuilding } from 'react-icons/bs'
import { FaUserGraduate } from 'react-icons/fa'
import { MdGroupAdd } from 'react-icons/md'


export default S.listItem()
  .title('Clients')
  .icon(IoIosPeople)
  .child(
    S.list()
      .title('Clients')
      .items([
        S.listItem('company')
          .title('Clients by company')
          .icon(BsBuilding)
          .child(
          S.documentList()
            .title('Company name')
            .schemaType('student')
            .filter('_type == "company"')
            .child(id => // Returns the id for the selected category document
              S.documentList()
                .title('Student name')
                .schemaType('student')
                .filter('_type == "student" && $id == company._ref')
                .params({id}) // use the id in the filter to return sampleProjects that has a reference to the category
            )
        ),
        S.listItem()
          .title('Clients by name')
          .icon(FaUserGraduate)
          .child(
            S.documentTypeList('student')
              .title('Students')   
          ),
        S.divider(),
        S.listItem()
          .title('Add/edit companies')
          .icon(MdGroupAdd)
          .child(
            S.documentTypeList('company')
              .title('All companies')   
          ),
      ])
  )