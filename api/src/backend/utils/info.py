from importlib.metadata import metadata

from pydantic import BaseModel

package = metadata("backend")


class ServiceInfo(BaseModel):
    title: str = package.get("Name")
    version: str = package.get("Version")
    description: str = package.get("Summary")


service_info = ServiceInfo()
