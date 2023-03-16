const sendRes = (res, cod = 200, dataOrError, message) => {
    res.status(cod)
    return res.json({
      data: dataOrError,
      message: message || (cod === 200 ? 'Success' : undefined),
    })
}

module.exports = { sendRes }