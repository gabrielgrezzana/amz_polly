// src/aws-config.ts
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: "AKIAUW4RASJQ4242UMXF",
  secretAccessKey: "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", // substitua pela sua Secret Access Key
  region: "us-east-1", // escolha a região que você deseja usar
});

export const polly = new AWS.Polly();
