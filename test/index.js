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

const globals = {
  organizationID: null,
  domainID: null,
  destinationID: null,
  destinationListID: null
}

const CiscoUmbrella = new UmbrellaClient(ciscoConfig)

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

const testEnforcementDomainDelete = async (domainID) => {
  try {
    await CiscoUmbrella.deleteEnforcementDomain(domainID)
    return true
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

const testDestinationListGet = async (organizationID) => {
  try {
    if (!organizationID) { console.error('organization id not found'); return false }

    const { status, meta, data } = await CiscoUmbrella.getDestinationLists(organizationID)
    return { status, meta, data }
  } catch (err) {
    console.error(err)
    return false
  }
}

const testDestinationListDetailsGet = async (organizationID, destinationListID) => {
  try {
    if (!organizationID) { console.error('organization id not found'); return false }
    if (!destinationListID) { console.error('destination list id not found'); return false }

    const CiscoDestinationListDetails = await CiscoUmbrella.getDestinationListDetails(organizationID, destinationListID)
    return CiscoDestinationListDetails
  } catch (err) {
    console.error(err)
    return false
  }
}

const testDestinationListSubmit = async (organizationID) => {
  try {
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

const testDestinationListPatch = async (organizationID, destinationListID) => {
  try {
    if (!organizationID) { console.error('organization id not found'); return false }
    if (!destinationListID) { console.error('destination list id not found'); return false }

    const CiscoListPatch = await CiscoUmbrella.patchDestinationList(organizationID, destinationListID, { name: 'Patch test' })
    return CiscoListPatch
  } catch (err) {
    console.error(err)
    return false
  }
}

const testDestinationsGet = async (orgID, destinationListID) => {
  try {
    let organizationID = orgID
    if (!organizationID) { console.error('organization id not found'); return false }
    if (!destinationListID) { console.error('destination list id not found'); return false }

    const { status, meta, data } = await CiscoUmbrella.getDestinations(organizationID, destinationListID)
    return { status, meta, data }
  } catch (err) {
    console.error(err)
    return false
  }
}

const testDestinationAdd = async (organizationID, destinationListID) => {
  try {
    if (!organizationID) { console.error('organization id not found'); return false }
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

const testDestinationDelete = async (organizationID, destinationListID, destinationID) => {
  try {
    if (!organizationID) { console.error('organization id not found'); return false }
    if (!destinationListID) { console.error('destination list id not found'); return false }
    if (!destinationID) { console.error('destinationID not found.'); return false }

    const DestinationDelete = await CiscoUmbrella.deleteDestinations(organizationID, destinationListID, [parseInt(destinationID)])
    return DestinationDelete
  } catch (err) {
    console.error(err)
    return false
  }
}

describe('Test Enforcement API', () => {
  describe('Environment Setup', () => {
    it('Should set global variables', async () => {
      // set org
      const [{ organizationId: ciscoOrgID = '' } = {}] = await testOrganizationGet()
      assert.isNotNull(ciscoOrgID, 'The request should return a valid org ID.')
      globals.organizationID = ciscoOrgID
      // set domain
      const CiscoDomains = await testEnforcementDomainGet()
      assert.strictEqual(typeof CiscoDomains === 'object', true, 'Cisco Domains is an object meaning successful request.')
      assert.strictEqual(CiscoDomains.hasOwnProperty('data'), true, 'Check Cisco Domains object for property ciscoData.')
      const { data: ciscoData } = CiscoDomains
      assert.isNotNull(ciscoData.id, 'The domain id should be valid.')
      globals.domainID = ciscoData.id
    })
  })
  describe('Testing Domain Acquisition', () => {
    it('Should return all domains for a given enforcement key', async () => {
      const CiscoDomains = await testEnforcementDomainGet()
      console.log(CiscoDomains)

      assert.strictEqual(typeof CiscoDomains === 'object', true, 'Assets Cisco Domains is an object meaning successful request.')
      assert.strictEqual(CiscoDomains.hasOwnProperty('data'), true, 'Check Cisco Domains object for property ciscoData.')
      assert.strictEqual(CiscoDomains.hasOwnProperty('meta'), true, 'Check Cisco Domains object for property meta.')
    })
  })
  describe('Testing Domain Submission', () => {
    it('Should submit a new domain to Umbrella Enforcement given a key', async () => {
      const CiscoSubmit = await testEnforcementDomainSubmit()
      console.log(CiscoSubmit)
      assert.strictEqual(typeof CiscoSubmit === 'object', true, 'Assert Cisco Submit is an object meaning succesful request.')
      assert.strictEqual(CiscoSubmit.hasOwnProperty('id'), true, 'Asserts Cisco Submit ID exists for new domain.')
      globals.domainID = CiscoSubmit.id
    })
  })
  describe('Testing Domain Deletion', () => {
    it('Should delete a given domain from Umbrella Enforcement given a key', async () => {
      const CiscoDelete = await testEnforcementDomainDelete(globals.domainID)

      assert.strictEqual(CiscoDelete, true, 'Assert that the request did complete for deleting domain.')
    })
  })
  describe('Testing Destination List Submission', () => {
    it('Should successfully submit a destination list request', async () => {
      const CiscoListSubmit = await testDestinationListSubmit(globals.organizationID)

      assert.strictEqual(typeof CiscoListSubmit === 'object', true, 'Assert Cisco Submit is an object meaning succesful request.')
      assert.strictEqual(CiscoListSubmit.hasOwnProperty('id'), true, 'Asserts Cisco Submit ID exists for new domain.')
      globals.destinationListID = CiscoListSubmit.id
    })
  })
  describe('Testing Destination List Get', () => {
    it('Should get a given destination list from Umbrella Enforcement given a key', async () => {
      const DestinationDetails = await testDestinationListGet(globals.organizationID)
      assert.strictEqual(typeof DestinationDetails === 'object', true, 'Should return a valid response.')
    })
  })
  describe('Testing Destination List Details Get', () => {
    it('Should get a given destination list from Umbrella Enforcement given a key', async () => {
      const DestinationDetails = await testDestinationListDetailsGet(globals.organizationID, globals.destinationListID)
      assert.strictEqual(typeof DestinationDetails === 'object', true, 'Should return a valid response.')
    })
  })
  describe('Testing Destination List Patch', () => {
    it('Should delete a given domain from Umbrella Enforcement given a key', async () => {
      const CiscoListPatch = await testDestinationListPatch(globals.organizationID, globals.destinationListID)

      assert.strictEqual(typeof CiscoListPatch === 'object', true, 'Assert that the request returned a valid object.')
    })
  })
  describe('Testing Destinations Get', () => {
    it('Should get a given destination from Umbrella Enforcement given a key', async () => {
      const DestinationGet = await testDestinationsGet(globals.organizationID, globals.destinationListID)

      assert.strictEqual(typeof DestinationGet === 'object', true, 'Assert that the request completed.')
    })
  })
  describe('Testing Destination Add', () => {
    it('Should add a given destination from Umbrella Enforcement given input', async () => {
      const DestinationAdd = await testDestinationAdd(globals.organizationID, globals.destinationListID)

      assert.strictEqual(typeof DestinationAdd === 'object', true, 'Assert that the request completed.')
      assert.strictEqual(DestinationAdd.hasOwnProperty('status'), true, 'Asserts Cisco Submit ID exists for new domain.')
      assert.strictEqual(DestinationAdd.hasOwnProperty('data'), true, 'Asserts Cisco Submit ID exists for new domain.')
      assert.isNotNull(DestinationAdd.data.id, true, 'Asserts Cisco Destination Submit ID exists for new domain.')
      globals.destinationID = DestinationAdd.data.id
    })
  })
  describe('Testing Destination Deletion', () => {
    it('Should delete a given domain from Umbrella Enforcement given a key', async () => {
      const DestinationDelete = await testDestinationDelete(globals.organizationID, globals.destinationListID, globals.destinationID)

      assert.strictEqual(DestinationDelete, true, 'Assert that the request did complete for deleting domain.')
    })
  })
})
