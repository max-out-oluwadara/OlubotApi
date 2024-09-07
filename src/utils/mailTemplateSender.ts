import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import juice from 'juice';

import { EmailContext } from '../types/mail';
import { sendEmail as sendMail } from '../config/mail';
import { addEmailToQueue } from '../config/queue';

// Function to read and register all partials in a directory
const registerPartials = (partialsDir: string) => {
  const partialsPath = path.resolve(__dirname, partialsDir);
  const files = fs.readdirSync(partialsPath);

  files.forEach((file) => {
    const partialName = path.basename(file, path.extname(file));
    const partialPath = path.join(partialsPath, file);
    const source = fs.readFileSync(partialPath, 'utf8');
    handlebars.registerPartial(partialName, source);
  });
};

// Register partials from the partials directory
registerPartials('../templates/partials');

export const compileTemplate = (
  templateName: string,
  context: EmailContext,
): string => {
  // Compile the content template
  const contentTemplatePath = path.resolve(
    __dirname,
    `../templates/${templateName}.hbs`,
  );
  const contentSource = fs.readFileSync(contentTemplatePath, 'utf8');
  const contentTemplate = handlebars.compile(contentSource);
  const contentHtml = contentTemplate(context);

  // Read the external CSS
  const cssPath = path.resolve(__dirname, '../templates/layout/styles.css');
  const css = fs.readFileSync(cssPath, 'utf8');

  // Compile the layout template with the content and styles inserted
  const layoutTemplatePath = path.resolve(
    __dirname,
    '../templates/layout/main.hbs',
  );
  const layoutSource = fs.readFileSync(layoutTemplatePath, 'utf8');
  const layoutTemplate = handlebars.compile(layoutSource);
  let html = layoutTemplate({ body: contentHtml, styles: css });

  // Inline the CSS styles
  html = juice(html);

  return html;
};

export const sendEmail = async (
  to: string,
  templateName: string,
  context: EmailContext,
): Promise<void> => {
  const html = compileTemplate(templateName, context);
  const { subject } = context; // Extract subject from context
  await sendMail(to, subject, html);
};

export const queueEmail = async (
  to: string,
  templateName: string,
  context: EmailContext,
): Promise<void> => {
  await addEmailToQueue({ to, templateName, context });
};
