# CSC581_Cloud_Project
# KubePix
**A Kubernetes-Based Image Sharing and Processing Pipeline**
The application is designed as a multi-Pod Kubernetes application with separate components for the Web/API, image processing, and persistent storage. The image-processing stage uses a multi-container Pod consisting of an image processor and a logging sidecar.

## Project Architecture

KubePix is designed around the following primary components:

- **Web/API Pod** – Handles image uploads and requests from users.
- **Image Processing Pod** – Resizes and compresses uploaded images.
  - Image Processor Container
  - Logging Sidecar Container
- **Storage Pod** – Stores and retrieves processed images and metadata.
- **Persistent Storage** – Uses Kubernetes PV/PVC storage to preserve application data.

## Deliverable 1

The complete architecture and implementation plan can be found in the technical report included in this repository:

**Technical Report.pdf**

## Course

**CSC581 – Cloud Computing**  
West Chester University  
Maiti Clark
