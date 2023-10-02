const CertificadosAcademicos = artifacts.require("CertificadosAcademicos");

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(CertificadosAcademicos);
  const certificadoAcademicos = await CertificadosAcademicos.deployed()
};
