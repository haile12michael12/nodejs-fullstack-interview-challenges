const protoLoader = require('@grpc/proto-loader');

function loadProto(protoPath) {
  return protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
}

module.exports = {
  loadProto
};