const JwebCisco = require('../dist')

require('dotenv').config()

const JwebEnforcementKey = process.env.CISCO_ENFORCEMENT_KEY || ''

const testDomainGet = async () => {
  try {
    const ciscoDomains = await JwebCisco.getDomains(JwebEnforcementKey)
    return ciscoDomains
  } catch (err) {
    console.error(err)
  }
}

const testDomainSubmit = async () => {
  try {
    await JwebCisco.submitDomains(
      JwebEnforcementKey,
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
  } catch (err) {
    console.error(err)
  }
}

const testDomainDelete = async () => {
  try {
    const { ciscoData } = await testDomainGet()
    console.log('Acquired initial domains:\n', JSON.stringify(ciscoData, null, 2))

    const [{ id }] = ciscoData
    console.log('Deleting domainID: ', id)

    await JwebCisco.deleteDomain(JwebEnforcementKey, id)

    const { ciscoData: newCiscoData } = await testDomainGet()
    console.log('Current domains:\n', JSON.stringify(newCiscoData, null, 2))
  } catch (err) {
    console.error(err)
  }
}

testDomainDelete()
