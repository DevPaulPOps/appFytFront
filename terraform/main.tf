resource "google_cloud_run_service" "frontend" {
  name     = var.serviceName
  location = var.region

  template {
    spec {
      containers {
        image = var.imageFrontend
      }
    }
  }

  autogenerate_revision_name = true
}
