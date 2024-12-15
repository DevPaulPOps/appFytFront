variable "region" {
  description = "Region GCP"
  type = string
  default = "us-central1"
}

variable "projectID" {
  description = "Project GCP AppFyt ID"
  type = string
  default = "braided-triode-414110"
}

variable "imageFrontend" {
description = "Image Frontend"
  type = string
  default = "us-central1-docker.pkg.dev/braided-triode-414110/cloud-run-source-deploy/front_fyt/frontendfytapp-image"
}
variable "serviceName" {
  description = "Service Name"
  type = string
  default = "frontendfytapp-image"
}
