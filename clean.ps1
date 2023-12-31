

$dockerContainerList = docker container ls
$dockerImageList = docker image ls
$dockerContainerStop = "docker container stop "
$dockerContainerRemove = "docker container rm "
$dockerImageRemove = "docker image rm "

function StopRemoveDockerContainerAndImage {
    param(
        [string]$ContainerName
    )
    $dockerContainerList = docker container ls
    $dockerContainerStop = "docker container stop "
    $dockerContainerRemove = "docker container rm "
    $containerLine = $dockerContainerList | Select-String $ContainerName
    if ($containerLine) {
        $containerId = ($containerLine.Line -split '\s+')[0]
        Invoke-Expression ($dockerContainerStop + $containerId)
        Invoke-Expression ($dockerContainerRemove + $containerId)
        Write-Host "Container $containerId stopped and removed."
    } else {
        Write-Host "No container with name '$ContainerName' found."
    }
    $imageLine = $dockerImageList | Select-String $ContainerName
    if ($imageLine) {
        $imageId = ($imageLine.Line -split '\s+')[2]
        Invoke-Expression ($dockerImageRemove + $imageId)
    } else {
        Write-Host "No '$ContainerName' found in images"
    }
}

StopRemoveDockerContainerAndImage -ContainerName "frontend"
StopRemoveDockerContainerAndImage -ContainerName "backend"
StopRemoveDockerContainerAndImage -ContainerName "database"