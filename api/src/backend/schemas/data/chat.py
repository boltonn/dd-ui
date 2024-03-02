from typing import Literal

from pydantic import Field

from backend.schemas.data.parents.message import Message
from backend.schemas.enums import DataType


class ChatMessage(Message):
    data_type: Literal["chat_message"] = Field(DataType.chat_message)
