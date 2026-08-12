#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <locale.h>
#ifdef _WIN32
#include <windows.h>
#endif

int main(void)
{
#ifdef _WIN32
  SetConsoleOutputCP(CP_UTF8);
  SetConsoleCP(CP_UTF8);
#endif
  setlocale(LC_ALL, "");

  char line[256];
  printf("BMI calculator. Enter height (cm) and weight (kg), or type quit to exit.\n");
  while (1)
  {
    printf("Enter height and weight, or quit: ");
    if (!fgets(line, sizeof(line), stdin))
    {
      break;
    }
    if (line[0] == '\n')
    {
      continue;
    }
    line[strcspn(line, "\r\n")] = '\0';
    if (strcmp(line, "quit") == 0)
    {
      break;
    }
    double height = 0.0;
    double weight = 0.0;
    int scanned = sscanf(line, "%lf %lf", &height, &weight);
    if (scanned != 2 || height <= 0.0 || weight <= 0.0)
    {
      printf("Invalid input. Please enter height and weight, for example: 170 70\n");
      continue;
    }
    double bmi = weight / ((height / 100.0) * (height / 100.0));
    printf("BMI = %.1f\n", bmi);
  }
  printf("Program exited.\n");
  return 0;
}
