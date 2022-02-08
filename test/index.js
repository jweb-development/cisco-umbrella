const CiscoUmbrella = require('../dist')
const { assert } = require('chai')

require('dotenv').config()

const EnforcementKey = process.env.CISCO_ENFORCEMENT_KEY || ''
const ManagementKey = process.env.CISCO_MANAGEMENT_KEY || ''
const ManagementSecret = process.env.CISCO_MANAGEMENT_SECRET || ''

const testDomainGet = async () => {
  try {
    // console.log('Acquiring domains on: ', EnforcementKey)
    const umbrellaDomains = await CiscoUmbrella.getDomains(EnforcementKey)

    return umbrellaDomains
  } catch (err) {
    console.error(err)
    return false
  }
}

const testDomainSubmit = async () => {
  try {
    const submitResponse = await CiscoUmbrella.submitDomains(
      EnforcementKey,
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

const testDomainDelete = async () => {
  try {
    const { ciscoData } = await testDomainGet()
    // console.log('Acquired initial domains:\n', JSON.stringify(ciscoData, null, 2))

    if (ciscoData && Boolean(ciscoData.length) && ciscoData.length > 1) {
      const [{ id }] = ciscoData
      // console.log('Deleting domainID: ', id)
      await CiscoUmbrella.deleteDomain(EnforcementKey, id)

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
    await CiscoUmbrella.getOrganizations(ManagementKey, ManagementSecret)
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
//       assert.strictEqual(CiscoDomains.hasOwnProperty('ciscoData'), true, 'Check Cisco Domains object for property ciscoData.')
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

testOrganizationGet()
