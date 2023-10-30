class GpsData:
    def __init__(self):
        self.fixType = 0

        self.lon = 0.0
        self.lat = 0.0
        self.height = 0.0

        self.velN = 0.0
        self.velE = 0.0
        self.velD = 0.0


class ImuData:
    def __init__(self):
        self.acc = [0.0, 0.0, 0.0]
        self.gyro = [0.0, 0.0, 0.0]
        self.mag = [0.0, 0.0, 0.0]
        self.euler = [0.0, 0.0, 0.0]
        self.temp = 0
        self.press = 0
        self.p_alt = 0
        self.ejection = 0  # 0: 기본 1: 자세사출 2: 고도사출 3: 타이머사출
