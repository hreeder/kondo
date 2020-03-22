const parts = process.env.ref.split("/");
const branch_name = parts[parts.length-1];

if (branch_name === "master") {
    console.log("::set-env name=K8S_NAMESPACE::kondo");
    console.log("::set-env name=K8S_DIR::prod");
} else if (branch_name === "dev") {
    console.log(":::set-env name=K8S_NAMESPACE::kondo-dev");
    console.log(":::set-env name=K8S_DIR::dev");
}
