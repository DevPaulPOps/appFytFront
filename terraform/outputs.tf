output "frontend_service_url" {
  value       = google_cloud_run_service.frontend.status[0].url
  description = "The URL of the deployed frontend Cloud Run service."
}

output "frontend_service_project_id" {
  value       = var.projectID
  description = "The Project ID associated with the frontend Cloud Run service."
}

output "frontend_service_location" {
  value       = var.region
  description = "The region where the frontend Cloud Run service is deployed."
}
