import { gql } from '@apollo/client'

export const getUnits = gql`
query getUnits{
  getUnits{
    idUnit
    name
  }
}
`