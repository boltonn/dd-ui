from typing import Literal, Optional

from pydantic import Field, confloat, conint

from backend.schemas.data.parents.file import File
from backend.schemas.enums import DataType


class Video(File):
    data_type: Literal["video"] = Field(DataType.video)
    width: conint(gt=0) = Field(..., example=640, description="Width of the image")
    height: conint(gt=0) = Field(..., example=640, description="Height of the image")
    num_frames: conint(gt=0) = Field(..., example=1234, description="Number of frames in the video")
    duration: Optional[confloat(gt=0)] = Field(..., example=100.0, description="Duration of the video (ms)")
    fps: confloat(gt=0) = Field(..., example=30.0, description="Frames per second of the video if constant")
    is_variable_fps: bool = Field(..., example=False, description="Whether the video has variable fps")
