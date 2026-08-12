#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(void) {
    char line[256];
    printf("BMI 計算程式，輸入身高(公分)和體重(公斤)，或輸入 quit 結束。\n");
    while (1) {
        printf("請輸入 (height weight) 或 quit: ");
        if (!fgets(line, sizeof(line), stdin)) {
            break;
        }
        if (line[0] == '\n') {
            continue;
        }
        line[strcspn(line, "\r\n")] = '\0';
        if (strcmp(line, "quit") == 0) {
            break;
        }
        double height = 0.0;
        double weight = 0.0;
        int scanned = sscanf(line, "%lf %lf", &height, &weight);
        if (scanned != 2 || height <= 0.0 || weight <= 0.0) {
            printf("輸入格式錯誤，請輸入身高和體重，例如: 170 70\n");
            continue;
        }
        double bmi = weight / ((height / 100.0) * (height / 100.0));
        printf("BMI = %.1f\n", bmi);
    }
    printf("程式結束。\n");
    return 0;
}
