import logging

import colorlog

from config import LOG_FORMAT, LOG_DATE_FORMAT, LOG_COLORS, LOGFILE_PATH


class Logger:
    _instance = None

    def __new__(cls, filepath=LOGFILE_PATH, console_log_level=logging.DEBUG,
            file_log_level=logging.INFO):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.logger = logging.getLogger("inbuddy.scheduler")
            cls._instance.logger.setLevel(logging.DEBUG)

            file_handler = logging.FileHandler(filepath)
            file_handler.setLevel(file_log_level)

            console_handler = colorlog.StreamHandler()
            console_handler.setLevel(console_log_level)

            formatter = colorlog.ColoredFormatter(fmt=LOG_FORMAT,
                                                  datefmt=LOG_DATE_FORMAT,
                                                  log_colors=LOG_COLORS)

            console_handler.setFormatter(formatter)
            file_handler.setFormatter(logging.Formatter(
                    fmt=LOG_FORMAT.replace('%(log_color)s', '').replace(
                            '%(reset)s', ''), datefmt=LOG_DATE_FORMAT))

            cls._instance.logger.addHandler(file_handler)
            cls._instance.logger.addHandler(console_handler)

        return cls._instance

    def info(self, message):
        self.logger.info(message)

    def warning(self, message):
        self.logger.warning(message)

    def debug(self, message):
        self.logger.debug(message)

    def error(self, message):
        self.logger.error(message)

    def set_log_level(self, level):
        self.logger.setLevel(level)


log = Logger()
