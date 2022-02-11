const { UmbrellaClient } = require('../dist')
const { assert } = require('chai')

require('dotenv').config()

const ciscoConfig = {
  MANAGEMENT: {
    key: process.env.CISCO_MANAGEMENT_KEY || '',
    secret: process.env.CISCO_MANAGEMENT_SECRET || ''
  },
  NETWORKING: {
    key: process.env.CISCO_NETWORKING_KEY || '',
    secret: process.env.CISCO_NETWORKING_SECRET || ''
  },
  ENFORCEMENT: {
    key: process.env.CISCO_ENFORCEMENT_KEY || ''
  }
}

const CiscoUmbrella = new UmbrellaClient(ciscoConfig)

// const CiscoUmbrella = 

const testEnforcementDomainGet = async () => {
  try {
    // console.log('Acquiring domains on: ', EnforcementKey)
    const { data, meta } = await CiscoUmbrella.getEnforcementDomains()
    return { data, meta }
  } catch (err) {
    console.error(err)
    return false
  }
}

const testEnforcementDomainSubmit = async () => {
  try {
    const submitResponse = await CiscoUmbrella.submitEnforcementDomains(
      [
        {
          websiteURL: 'https://www.urbandictionary.com/define.php?term=NFT&defid=16959657',
          eventTime: new Date(),
          deviceID: 'jakesjweblappy.lan'
        }
      ],
      'LearnSafe',
      '10.1.0017'
    )

    return submitResponse
  } catch (err) {
    console.error(err)
    return false
  }
}

const testEnforcementDomainDelete = async () => {
  try {
    const CiscoDomains = await testEnforcementDomainGet()
    if (!CiscoDomains) { console.error('Failed to get domains'); return false }
    // console.log('Acquired initial domains:\n', JSON.stringify(ciscoData, null, 2))

    const { data: ciscoData } = CiscoDomains

    if (ciscoData && Boolean(ciscoData.length) && ciscoData.length > 1) {
      const [{ id: domainID }] = ciscoData
      // console.log('Deleting domainID: ', id)
      await CiscoUmbrella.deleteEnforcementDomain(domainID)

      return true

      // const { ciscoData: newCiscoData } = await testDomainGet()
      // console.log('Current domains:\n', JSON.stringify(newCiscoData, null, 2))
    }
  } catch (err) {
    console.error(err)
    return false
  }
}

const testOrganizationGet = async () => {
  try {
    const CiscoOrganizations = await CiscoUmbrella.getOrganizations()
    return CiscoOrganizations
  } catch (err) {
    console.error(err)
    return false
  }
}

const testDestinationListGet = async (orgID = '') => {
  try {
    let organizationID = ''

    if (orgID) {
      organizationID = orgID
    } else {
      const [{ organizationId: ciscoOrgID = '' } = {}] = await testOrganizationGet()
      organizationID = ciscoOrgID
    }
    if (!organizationID) { console.error('organization id not found'); return false }

    const CiscoDestinationLists = await CiscoUmbrella.getDestinationLists(organizationID)
    return CiscoDestinationLists
  } catch (err) {
    console.error(err)
    return false
  }
}

const testDestinationListDetailsGet = async () => {
  try {
    const [{ organizationId: organizationID = '' } = {}] = await testOrganizationGet()
    if (!organizationID) { console.error('organization id not found'); return false }

    const { data: [{ id: destinationListID } = {}] = [] } = await testDestinationListGet(organizationID)
    if (!destinationListID) { console.error('destination list id not found'); return false }

    const CiscoDestinationListDetails = await CiscoUmbrella.getDestinationListDetails(organizationID, destinationListID)
    return CiscoDestinationListDetails
  } catch (err) {
    console.error(err)
    return false
  }
}

const testDestinationListSubmit = async () => {
  try {
    const [{ organizationId: organizationID = '' } = {}] = await testOrganizationGet()
    if (!organizationID) { console.error('organization id not found'); return false }

    const CiscoListSubmit = await CiscoUmbrella.submitDestinationList(organizationID, {
      isDnsPolicy: false,
      access: 'block',
      name: 'Bad Stuff',
      isGlobal: false,
      destinations: [
        {
          comment: 'This is bad',
          destination: 'https://urbandictionary.com'
        }
      ]
    })

    return CiscoListSubmit
  } catch (err) {
    console.error(err)
    return false
  }
}

const testDestinationListPatch = async () => {
  try {
    const [{ organizationId: organizationID = '' } = {}] = await testOrganizationGet()
    if (!organizationID) { console.error('organization id not found'); return false }

    const { data: [{ id: destinationListID } = {}] = [] } = await testDestinationListGet(organizationID)
    if (!destinationListID) { console.error('destination list id not found'); return false }

    const CiscoListPatch = await CiscoUmbrella.patchDestinationList(organizationID, destinationListID, { name: 'Patch test' })
    return CiscoListPatch
  } catch (err) {
    console.error(err)
    return false
  }
}

const testDestinationsGet = async () => {
  try {
    const [{ organizationId: organizationID = '' } = {}] = await testOrganizationGet()
    if (!organizationID) { console.error('organization id not found'); return false }

    const { data: [{ id: destinationListID } = {}] = [] } = await testDestinationListGet(organizationID)
    if (!destinationListID) { console.error('destination list id not found'); return false }

    const { status, meta, data } = await CiscoUmbrella.getDestinations(organizationID, destinationListID)
    return { status, meta, data }
  } catch (err) {
    console.error(err)
    return false
  }
}

const testDestinationAdd = async () => {
  try {
    const [{ organizationId: organizationID = '' } = {}] = await testOrganizationGet()
    if (!organizationID) { console.error('organization id not found'); return false }

    const { data: [{ id: destinationListID } = {}] = [] } = await testDestinationListGet(organizationID)
    if (!destinationListID) { console.error('destination list id not found'); return false }

    const newDestinations = [
      {
        comment: 'this test is bad too',
        destination: 'https://www.urbandictionary.com/define.php?term=farm+emo'
      }
    ]

    const CiscoDomainAdd = await CiscoUmbrella.addDestinations(organizationID, destinationListID, newDestinations)
    return CiscoDomainAdd
  } catch (err) {
    console.error(err)
    return false
  }
}

const testDestinationDelete = async () => {
  try {
    const [{ organizationId: organizationID = '' } = {}] = await testOrganizationGet()
    if (!organizationID) { console.error('organization id not found'); return false }

    const { data: [{ id: destinationListID } = {}] = [] } = await testDestinationListGet(organizationID)
    if (!destinationListID) { console.error('destination list id not found'); return false }

    const Destinations = await testDestinationsGet()
    if (!Destinations) { console.error('destinations not acquired'); return false }

    const { data: [{ id: destinationID } = {}] } = Destinations
    if (!destinationID) { console.error('destinationID not found.'); return false }

    const DestinationDelete = await CiscoUmbrella.deleteDestinations(organizationID, destinationListID, [destinationID])
    return DestinationDelete
  } catch (err) {
    console.error(err)
    return false
  }
}

// describe('Test Enforcement API', () => {
//   describe('Testing Domain Acquisition', () => {
//     it('Should return all domains for a given enforcement key', async () => {
//       const CiscoDomains = await testDomainGet()

//       assert.strictEqual(typeof CiscoDomains === 'object', true, 'Assets Cisco Domains is an object meaning successful request.')
//       assert.strictEqual(CiscoDomains.hasOwnProperty('data'), true, 'Check Cisco Domains object for property ciscoData.')
//       assert.strictEqual(CiscoDomains.hasOwnProperty('meta'), true, 'Check Cisco Domains object for property meta.')
//     })
//   })
//   describe('Testing Domain Submission', () => {
//     it('Should submit a new domain to Umbrella Enforcement given a key', async () => {
//       const CiscoSubmit = await testDomainSubmit()

//       assert.strictEqual(typeof CiscoSubmit === 'object', true, 'Assert Cisco Submit is an object meaning succesful request.')
//       assert.strictEqual(CiscoSubmit.hasOwnProperty('id'), true, 'Asserts Cisco Submit ID exists for new domain.')
//     })
//   })
//   describe('Testing Domain Deletion', () => {
//     it('Should delete a given domain from Umbrella Enforcement given a key', async () => {
//       const CiscoDelete = await testDomainDelete()

//       assert.strictEqual(CiscoDelete, true, 'Assert that the request did complete for deleting domain.')
//     })
//   })
// })
