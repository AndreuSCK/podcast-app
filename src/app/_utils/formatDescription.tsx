const URL_REGEX =
  /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/;

const fixUrl = (url: string) => {
  if (url.includes("https://") || url.includes("http://")) {
    return url;
  } else {
    return "https://" + url;
  }
};
const FormattedText = ({ description }: { description: string }) => {
  const fixUnicode = description.replace(/\u00a0/g, " ");
  const paragraphs = fixUnicode.split(/\n/);
  return (
    <p>
      {paragraphs.map((paragraph, index) => (
        <span key={index}>
          {paragraph.split(" ").map((word, wordIndex) =>
            word.match(URL_REGEX) ? (
              <a
                href={fixUrl(word)}
                rel={"noreferrer"}
                target={"_blank"}
                key={`${index}-${wordIndex}`}
                className={"descriptionLink"}
              >
                {word + " "}
              </a>
            ) : (
              <span key={`${index}-${wordIndex}`}>{word + " "}</span>
            )
          )}
          <br />
        </span>
      ))}
    </p>
  );
};
export const FormatDescription = ({ description }: { description: string }) => {
  return <FormattedText description={description} />;
};
