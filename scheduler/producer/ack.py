from logger.logger import log


def ack(err, msg):
    if err is not None:
        log.error(f"Produce Failed: {err.str()}")
    else:
        log.info(
                f"Produce Success: [Topic: {msg.topic()}, Key: {msg.key().decode('utf-8')}]")
