const parts = process.env.ref.split("/");
const branch_name = parts[parts.length-1];

console.log(`Got This: ${process.env.ref}`);
console.log(`Parsed this: ${branch_name}`);

function setEnvVar(name, value) {
    console.log(`::set-env name=${name}::${value}`);
}

if (branch_name === "master") {
    setEnvVar("K8S_NAMESPACE", "kondo");
    setEnvVar("K8S_DIR", "prod");
} else if (branch_name === "dev") {
    setEnvVar("K8S_NAMESPACE", "kondo-dev");
    setEnvVar("K8S_DIR", "dev");
}
