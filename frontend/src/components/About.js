/**
 * This component acts as a simple info page about the app.
 * @returns {String} information about the app.
 */

const About = () => {
  return (
    <div className="About">
      Sovellus englannin sanojen harjoittelun tueksi. Suunnattu
      peruskouluikäisille lapsille sekä englannin opettajille. Sovelluksessa on
      2 moodia, opettaja moodi ja oppilas moodi. Opettajamoodi on suojattu
      salasanalla, tässä moodissa opettaja voi lisätä uusia käännöksiä
      tietokantaan, sekä poistaa ja muokata käännöksiä. Oppilasmoodissa pääsee
      harjoittelemaan sanoja haluamastaan aiheesta. Koodi löytyy kokonaisuudessaan
      githubista: https://github.com/seppohyvarinen/fullstack-language-app/
    </div>
  );
};

export default About;
